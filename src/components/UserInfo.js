
export default class UserInfo {
  constructor(profilSelector) {
    this._nameUser = document.querySelector(profilSelector.nameSelector);
    this._aboutUser = document.querySelector(profilSelector.aboutSelector);
    this._profileImage = document.querySelector(profilSelector.profileImage);
  }

  getUserInfo() {
    this._userInfo = {
      username: this._nameUser.textContent,
      about: this._aboutUser.textContent
    };
    return this._userInfo;
  }

  setUserInfo(username, about, avatar) {
    this._nameUser.textContent = username;
    this._aboutUser.textContent = about;
    this._profileImage.src = avatar;
  }

}
