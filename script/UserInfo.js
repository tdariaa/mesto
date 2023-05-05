
export default class UserInfo {

  constructor(profilSelector) {
    this._nameUser = document.querySelector(profilSelector.nameSelector);
    this._aboutUser = document.querySelector(profilSelector.aboutSelector);
  }

  getUserInfo() {
    this._userInfo = {
      username: this._nameUser.textContent,
      about: this._aboutUser.textContent
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameUser.textContent = data.username;
    this._aboutUser.textContent = data.about;
  }

}
