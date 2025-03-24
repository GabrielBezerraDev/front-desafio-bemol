export const getCurrentUser = () => {
      let userLocalStorage: null | string = localStorage.getItem("currentUser");
      if(userLocalStorage){
        return JSON.parse(userLocalStorage);
      }
      return null;
}
