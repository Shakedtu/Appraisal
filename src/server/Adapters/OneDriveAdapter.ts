const axios = require('axios');

class OneDriveAdapter {
  private api_url = 'https://graph.microsoft.com/v1.0/me';
  private drive_url =  `${this.api_url}/drive`;
  private drive_root_url = `${this.drive_url}/root`;

  async getProfile(token) {
    return axios.get(this.api_url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getDrive(token) {
    return axios.get(this.drive_url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getFile(token, filePath) {
    return axios.get(
      `${this.drive_root_url}/children/${filePath}`,
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
    const paddedPath = path ? `:/${path}:` : ''
    return axios.post(
        `${this.drive_root_url}${paddedPath}/children`,
      folder,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async createFile({ token, path, name, content }) {
    return axios.put(
      `${this.drive_root_url}:/${path}/${name}:/content`,
      content,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  async deleteFileOrFolder(token, path) {
    return axios.delete(
      `${this.drive_root_url}:/${path}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  async search(token, name) {
    return axios.get(
      `${this.drive_root_url}/search(q='${name}')`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
}

module.exports = OneDriveAdapter;
export {};
