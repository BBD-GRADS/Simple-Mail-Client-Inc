import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_ec2 as ec2,
  aws_elasticbeanstalk as elb,
  aws_iam as iam,
  aws_rds as rds,
  aws_s3_assets as s3Assets,
} from "aws-cdk-lib";
import {CfnEnvironment} from "aws-cdk-lib/aws-elasticbeanstalk";
import OptionSettingProperty = CfnEnvironment.OptionSettingProperty;

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appName = "email95";

    const vpc = new ec2.Vpc(this, `${appName}-vpc`, {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: `${appName}PublicSubnet`,
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    const securityGrouup = new ec2.SecurityGroup(this, `${appName}-sg`, {
      vpc,
      allowAllOutbound: false,
    });

    securityGrouup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(1433));
    securityGrouup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(1433));

    const dbInstance = new rds.DatabaseInstance(
      this,
      `${appName}-db-instance`,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: rds.PostgresEngineVersion.VER_16_1,
        }),
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T3,
          ec2.InstanceSize.MICRO
        ),
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        allocatedStorage: 20,
        publiclyAccessible: true,
        deletionProtection: false,
        credentials: rds.Credentials.fromGeneratedSecret("db_admin", {
          secretName: `${appName}-db-secret`,
        }),
        securityGroups: [securityGrouup],
      }
    );

    // Create elastic beanstalk
    const elbZipArchive = new s3Assets.Asset(this, `${appName}-api-zip`, {
      path: `${__dirname}/../../api`,
    });

    const elbApp = new elb.CfnApplication(this, `${appName}-elasticbeanstalk`, {
      applicationName: appName,
    });
    const appVersionProps = new elb.CfnApplicationVersion(
      this,
      `${appName}-app-version`,
      {
        applicationName: appName,
        sourceBundle: {
          s3Bucket: elbZipArchive.s3BucketName,
          s3Key: elbZipArchive.s3ObjectKey,
        },
      }
    );

    appVersionProps.addDependency(elbApp);

    const elbWebTierPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
      "AWSElasticBeanstalkWebTier"
    );
    const elbRole = new iam.Role(this, `${appName}-elasticbeanstalk-ec2-role`, {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [elbWebTierPolicy],
    });

    const instanceProfileName = `${appName}-instance-profile`;

    const instanceProfile = new iam.CfnInstanceProfile(
      this,
      instanceProfileName,
      {
        instanceProfileName: instanceProfileName,
        roles: [elbRole.roleName],
      }
    );
    const optionSettingProperties: OptionSettingProperty[] = [
      {
        namespace: "aws:autoscaling:launchconfiguration",
        optionName: "IamInstanceProfile",
        value: instanceProfileName,
      },
      {
        namespace: "aws:autoscaling:asg",
        optionName: "MaxSize",
        value: "1",
      },
      {
        namespace: "aws:ec2:instances",
        optionName: "InstanceTypes",
        value: "t3.micro",
      },
      {
        namespace: "aws:ec2:vpc",
        optionName: "VPCId",
        value: vpc.vpcId,
      },
      {
        namespace: "aws:ec2:vpc",
        optionName: "Subnets",
        value: vpc.publicSubnets.map((subnet) => subnet.subnetId).join(","),
      },
      {
        namespace: "aws:elasticbeanstalk:application:environment",
        optionName: "PORT",
        value: "3000",
      },
    ];

    const elbEnv = new elb.CfnEnvironment(this, `${appName}-env`, {
      environmentName: `${appName}-environment`,
      applicationName: appName,
      solutionStackName: "64bit Amazon Linux 2023 v6.1.3 running Node.js 20",
      optionSettings: optionSettingProperties,
      versionLabel: appVersionProps.ref,
    });
  }
}
