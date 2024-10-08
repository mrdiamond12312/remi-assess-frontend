declare namespace TEST {
    interface IDBSanitize {
      productName?: string;
      lessorShopName?: string;
      userName?: string;
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
  