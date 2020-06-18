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

  async getFile(token, filePath) {
    return axios.get(
      `https://graph.microsoft.com/v1.0/me/drive/root/children/${filePath}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async createFolder({ token, path, name }) {
    const folder = {
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename',
    };
    return axios.post(
      path
        ? `https://graph.microsoft.com/v1.0/me/drive/root:/${path}:/children`
        : 'https://graph.microsoft.com/v1.0/me/drive/root/children',
      folder,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async createFile({ token, path, name, content }) {
    return axios.put(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${path}/${name}:/content`,
      content,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async deleteFileOrFolder(token, path) {
    return axios.delete(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${path}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async search(token, name) {
    return axios.get(
      `https://graph.microsoft.com/v1.0/me/drive/root/search(q='${name}')`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

module.exports = OneDriveAdapter;
export { };
