const axios = require('axios');

class OneDriveAdapter {
  async getProfile(token) {
    return axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getDrive(token) {
    return axios.get('https://graph.microsoft.com/v1.0/me/drive', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

module.exports = OneDriveAdapter;
