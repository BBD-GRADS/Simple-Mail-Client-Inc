function sentEmail(
  s3EmailId,
  recipient,
  sender,
  sentTime,
  hasAttachments,
  subject
) {
  return {
    s3EmailId,
    recipient,
    sender,
    sentTime,
    hasAttachments,
    subject,
  };
}

module.exports = sentEmail;
