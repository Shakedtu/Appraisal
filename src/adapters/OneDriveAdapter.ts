import axios from 'axios';

export class OneDriveAdapter {
  private api_url = 'https://graph.microsoft.com/v1.0/me';
  private drive_url = `${this.api_url}/drive`;
  private drive_root_url = `${this.drive_url}/root`;

  private config(token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  async getProfile(token) {
    return axios.get(this.api_url, this.config(token));
  }

  async getDrive(token) {
    return axios.get(this.drive_url, this.config(token));
  }

  async getFile(token, filePath) {
    const response = await axios.get(
      `${this.drive_root_url}/children/${filePath}`,
      this.config(token)
    );
    return response.data;
  }

  async createFolder({ token, path, name }) {
    const folder = {
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename',
    };
    const paddedPath = path ? `:/${path}:` : '';
    const response = await axios.post(
      `${this.drive_root_url}${paddedPath}/children`,
      folder,
      this.config(token)
    );
    return response.data;
  }

  async createFile({ token, path, name, content }) {
    const response = await axios.put(
      `${this.drive_root_url}:/${path}/${name}:/content`,
      content,
      this.config(token)
    );
    return response.data;
  }

  async deleteFileOrFolder({ token, path, name }) {
    const paddedPath = path ? `:/${path}` : ':';
    return axios.delete(
      `${this.drive_root_url}${paddedPath}/${name}`,
      this.config(token)
    );
  }

  async search(token, name) {
    const response = await axios.get(
      `${this.drive_root_url}/search(q='${name}')`,
      this.config(token)
    );
    return response.data;
  }
}
