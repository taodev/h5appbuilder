import Mock from 'mockjs';

const Random = Mock.Random;

module.exports = {
  ['POST /api/v1/auth/login'] (req, res) {
    res.json({
      Code: 0,
      Message: '登陆成功--MOCK',
      Token: Mock.Random.string('lower', 16),
    });
  },
  ['POST /api/v1/auth/logout'] (req, res) {
    res.json({
      Code: 0,
      Message: '登陆成功--MOCK',
      Token: Mock.Random.string('lower', 16),
    });
  },
};
