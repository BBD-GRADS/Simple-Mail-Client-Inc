function receivedEmail(
  s3EmailId,
  recipient,
  sender,
  receivedTime,
  hasAttachments,
  subject
) {
  return {
    s3EmailId,
    recipient,
    sender,
    receivedTime,
    hasAttachments,
    subject,
  };
}

module.exports = receivedEmail;
