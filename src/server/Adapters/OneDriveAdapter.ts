const axios = require('axios');

class OneDriveAdapter {
  private api_url = 'https://graph.microsoft.com/v1.0/me';
  private drive_url = `${this.api_url}/drive`;
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
    const response = axios.get(`${this.drive_root_url}/children/${filePath}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async createFolder({ token, path, name }) {
    const folder = {
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename',
    };
    const paddedPath = path ? `:/${path}:` : '';
    const response = await axios.post(`${this.drive_root_url}${paddedPath}/children`, folder, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  }

  async createFile({ token, path, name, content }) {
    const response = await axios.put(
      `${this.drive_root_url}:/${path}/${name}:/content`,
      content,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async deleteFileOrFolder({ token, path, name }) {
    const paddedPath = path ? `:/${path}` : ':';
    return axios.delete(`${this.drive_root_url}${paddedPath}/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async search(token, name) {
    const response = await axios.get(`${this.drive_root_url}/search(q='${name}')`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

module.exports = OneDriveAdapter;
export { };
