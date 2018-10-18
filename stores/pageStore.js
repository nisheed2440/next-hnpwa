import { action, observable } from "mobx";
let store = null;
class PageStore {
  @observable
  pageData = [];

  @observable
  commentsData = {};

  @observable
  userData = {};

  @observable
  paginationData = {
    prevPage: null,
    nextPage: null,
    currPage: null,
    totalPages: 0
  };

  @observable
  isLoading = false;

  @observable
  hasError = false;

  constructor(initialState) {
    this.setPageData(initialState.data);
    this.setPaginationData(initialState.pagination);
  }

  @action
  showLoader = () => {
    this.isLoading = true;
  };

  @action
  hideLoader = () => {
    this.isLoading = false;
  };

  @action
  setPageData = data => {
    if (data) {
      this.pageData = [...data];
    } else {
      this.pageData = [];
    }
  };

  @action
  setCommentData = data => {
    if (data) {
      this.commentsData = Object.assign({}, data);
    } else {
      this.commentsData = {};
    }
  };

  @action
  setPaginationData = data => {
    if (data) {
      this.paginationData = Object.assign({}, data);
    } else {
      this.paginationData = {};
    }
  };

  @action
  setError = error => {
    this.resetError();
    this.hasError = error;
  };

  @action
  resetError = () => {
    this.hasError = false;
  };

  @action
  getPageData = async (type = "", query, req) => {
    this.showLoader();
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
    const page = query.pageId || 1;
    const res = await fetch(`${baseUrl}/api/page/${type}/${page}`);
    const json = await res.json();
    if (json.error || json.isRedirect) {
      this.setError(true);
      this.hideLoader();
      return;
    }
    this.setPageData(json.data);
    this.setPaginationData(json.pagination);
    this.hideLoader();
  };

  @action
  getCommentData = async (query, req) => {
    this.showLoader();
    this.setCommentData(null);
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
    const res = await fetch(`${baseUrl}/api/item/${query.itemId}`);
    const json = await res.json();
    if (json.error || json.isRedirect) {
      this.setError(true);
      this.hideLoader();
      return;
    }
    this.setCommentData(json.data);
    this.hideLoader();
  };
}

export function initializeStore(
  isServer,
  initialState = { data: [], pagination: {} }
) {
  if (isServer) {
    return new PageStore(initialState);
  } else {
    if (store === null) {
      store = new PageStore(initialState);
    }
    return store;
  }
}
