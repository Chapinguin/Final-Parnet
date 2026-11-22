import captchaService from '../services/CaptchaService.js';

export const getCaptcha = (req, res) => {
  const result = captchaService.generate();
  return res.json(result);
};

