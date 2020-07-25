import axios from 'axios';
const OneDriveAdapter = require('./OneDriveAdapter.ts');

describe('OneDrive Adapter', () => {
  it('should call userProfile endpoint', async () => {
    spyOn(axios, 'get');
    const token = 'some-token';
    const adapter = new OneDriveAdapter();

    await adapter.getProfile(token);

    expect(axios.get).toHaveBeenCalledWith(
      'https://graph.microsoft.com/v1.0/me',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
});
