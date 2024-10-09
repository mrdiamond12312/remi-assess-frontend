declare namespace TEST {
    interface IDBSanitize {
      ytbUrl?: string;
      userName?: string;
    }
    interface IVideoInfo {
      ytbUrl: string;
      willNavigate: boolean;
      login: boolean;
    }
    interface IRegisterInfo {
      userName?: string;
      fullName?: string;
      password?: string;
      passwordConfirm?: string;
      email?: string;
      willNavigate: boolean;
    }
    interface IProfileInfo extends IRegisterInfo {
      dob?: string;
      address?: string;
      phoneNumber?: string;
      citizenId?: string;
      citizenCardBack?: string;
      citizenCardFront?: string;
      avatar?: string;
      fullName?: string;
    }
  }
  