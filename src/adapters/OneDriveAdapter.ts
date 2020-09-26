import axios from 'axios';

export class OneDriveAdapter {
  private api_url = 'https://graph.microsoft.com/v1.0/me';
  private drive_url = `${this.api_url}/drive`;
  private drive_root_url = `${this.drive_url}/root`;
  private token = sessionStorage.getItem('token');

  private get config() {
    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }
  async getProfile() {
    return axios.get(this.api_url, this.config);
  }

  async getDrive() {
    return axios.get(this.drive_url, this.config);
  }

  async getFile(filePath) {
    const response = await axios.get(
      `${this.drive_root_url}/children/${filePath}`,
      this.config
    );
    return response.data;
  }

  async createFolder({ path, name }) {
    const folder = {
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename',
    };
    const paddedPath = path ? `:/${path}:` : '';
    const response = await axios.post(
      `${this.drive_root_url}${paddedPath}/children`,
      folder,
      this.config
    );
    return response.data;
  }

  async createFile({ path, name, content }) {
    const response = await axios.put(
      `${this.drive_root_url}:/${path}/${name}:/content`,
      content,
      this.config
    );
    return response.data;
  }

  async deleteFileOrFolder({ path, name }) {
    const paddedPath = path ? `:/${path}` : ':';
    return axios.delete(
      `${this.drive_root_url}${paddedPath}/${name}`,
      this.config
    );
  }

  async search(name) {
    const response = await axios.get(
      `${this.drive_root_url}/search(q='${name}')`,
      this.config
    );
    return response.data;
  }
}
