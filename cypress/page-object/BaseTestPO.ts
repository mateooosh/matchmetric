export default class BaseTestPO {

  url: string

  constructor() {
    this.url = '/'
  }

  clearStorage (key: string) {
    cy.clearLocalStorage(key)
  }

  // getGamesFromStorage () {
  //   return JSON.parse(localStorage.getItem('games'))
  // }
  //
  // setInStorage (key: string, object: object) {
  //   localStorage.setItem(key, JSON.stringify(object))
  // }
}
