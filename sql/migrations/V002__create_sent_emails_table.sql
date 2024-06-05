CREATE TABLE IF NOT EXISTS public.sent_emails
(
    s3_email_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    recipient character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sender character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sent_time timestamp without time zone NOT NULL,
    has_attachments boolean NOT NULL,
    subject character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT sent_emails_pkey PRIMARY KEY (s3_email_id)
)