import { Api } from '../../utils/api';

const queryData = {
  userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
  limit: 2,
  page: 1,
  sort: ['+amount_in_cents', 'date_created'],
};

const rootPath = (path) => `/expense/v1/get-user-expenses/${path}`;

describe('User\'s expense domain', () => {
  describe('Get User\'s Expenses', () => {
    test('user should read expenses successfully', (done) => {
      var path = rootPath(`?userId=${queryData.userId}`);
      Api.get(path)
        .expect(200, done);
    });

    test('user should sort expenses successfully', async () => {
      var path = rootPath(`?userId=${queryData.userId}&sort${queryData.sort}`);
      const res = await Api.get(path).expect(200);
      if (res.body.length > 1) {
        return expect(res.body[1].amount_in_cents >= res.body[0].amount_in_cents).toBe(true);
      }
    });

    test('user expenses response should be limited to one', async () => {
      var path = rootPath(`?userId=${queryData.userId}&sort${queryData.sort}&limit=1`);
      const res = await Api.get(path).expect(200);
      expect(res.body.length).toEqual(1);
    });
  });

  describe('Get User\'s Expenses > Validator', () => {
    test('Validator should not allow query that does not match validation schema', (done) => {
      var path = rootPath('?userId=ueuujd-shsh-wyg-e');
      Api.get(path)
        .expect(400, done);
    });
  });
});
