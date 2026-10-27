const COLORS = {
  success: 0x2ecc71,
  error:   0xe74c3c,
  warning: 0xf39c12,
  info:    0x3498db,
};

function container(content, color) {
  return {
    flags: 32768,
    components: [
      {
        type: 17,
        accent_color: color,
        components: [
          {
            type: 10,
            content: content,
          },
        ],
      },
    ],
  };
}

function successMsg(text) {
  return container(`✅  ${text}`, COLORS.success);
}

function errorMsg(text) {
  return container(`❌  ${text}`, COLORS.error);
}

function warningMsg(text) {
  return container(`⚠️  ${text}`, COLORS.warning);
}

function infoMsg(text) {
  return container(`ℹ️  ${text}`, COLORS.info);
}

module.exports = { successMsg, errorMsg, warningMsg, infoMsg };