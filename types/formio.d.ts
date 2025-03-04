export class Formio {
  constructor(url: string, options?: Object);
  public base: string;
  public projectsUrl: string;
  public projectUrl: string;
  public projectId: string;
  public formId: string;
  public submissionId: string;
  public actionsUrl: string;
  public actionId: string;
  public actionUrl: string;
  public vsUrl: string;
  public vId: string;
  public vUrl: string;
  public query: string;
  public formUrl?: string;
  public formsUrl?: string;
  public submissionUrl?: string;
  public submissionsUrl?: string;
  public token: any | string;
  static libraries: any;
  static Promise: any;
  static fetch: any;
  static Headers: any;
  static baseUrl: string;
  static projectUrl: string;
  static authUrl: string;
  static projectUrlSet: boolean;
  static plugins: any;
  static cache: any;
  static providers: any;
  static events: any; // EventEmitter2
  static namespace: string;
  static formOnly?: boolean;
  delete(type: any, opts?: any): any;
  index(type: any, query?: any, opts?: any): any;
  save(type: any, data: any, opts?: any): any;
  load(type: any, query?: any, opts?: any): any;
  makeRequest(...args): any;
  loadProject(query?: any, opts?: any): any;
  saveProject(data: any, opts?: any): any;
  deleteProject(opts?: any): any;
  static loadProjects(query?: any, opts?: any): any;
  static createForm(element: any, form: string | Object, options?: Object): Promise<any>;
  static setBaseUrl(url: string): void;
  static setProjectUrl(url: string): void;
  static setAuthUrl(url: string): void;
  static getToken(options?: any): any;
  static makeStaticRequest(url: string, method?: string, data?: any, opts?: Object): any;
  static makeRequest(formio?: Formio, type?: string, url?: string, method?: string, data?: any, opts?: Object): any;
  static currentUser(formio?: Formio, options?: Object): any;
  static logout(formio?: Formio, options?: Object): any;
  static clearCache(): void;
  static setUser(user: any, opts?: Object): any;
  loadForm(query?: any, opts?: Object): any;
  loadForms(query?: any, opts?: Object): any;
  loadSubmission(query?: any, opts?: Object): any;
  loadSubmissions(query?: any, opts?: Object): any;
  userPermissions(
    user?: any,
    form?: any,
    submission?: any,
  ): Promise<{ create: boolean; read: boolean; edit: boolean; delete: boolean }>;
  createform(form: Object): Promise<any>;
  saveForm(data: any, opts?: Object): any;
  saveSubmission(data: any, opts?: Object): any;
  deleteForm(opts?: Object): any;
  deleteSubmission(opts?: Object): any;
  saveAction(data: any, opts?: any): any;
  deleteAction(opts?: any): any;
  loadAction(query?: any, opts?: any): any;
  loadActions(query?: any, opts?: any): any;
  availableActions(): any;
  actionInfo(name: any): any;
  isObjectId(id: any): any;
  getProjectId(): any;
  getFormId(): any;
  currentUser(options?: Object): any;
  accessInfo(): any;
  getToken(options?: Object): any;
  setToken(token: any, options?: Object): any;
  getTempToken(expire: any, allowed: any, options?: Object): any;
  getDownloadUrl(form: any): any;
  uploadFile(storage: any, file: any, fileName: any, dir: any, progressCallback: any, url: any, options?: Object): any;
  downloadFile(file: any, options?: Object): any;
  canSubmit(): any;
  getUrlParts(url: any): any;
  static getUrlParts(url: any, formio?: Formio): any;
  static serialize(obj: any, _interpolate: any): any;
  static getRequestArgs(formio: Formio, type: string, url: string, method?: string, data?: any, opts?: any): any;
  static request(url: any, method?: any, data?: any, header?: any, opts?: any): any;
  static setToken(token: string, opts?: any): any;
  static getUser(options?: Object): any;
  static getBaseUrl(): string;
  static setApiUrl(url: string): any;
  static getApiUrl(): any;
  static setAppUrl(url: string): any;
  static getAppUrl(): any;
  static getProjectUrl(): any;
  static noop(): any;
  static identity(value: any): any;
  static deregisterPlugin(plugin: any): any;
  static registerPlugin(plugin: any, name: string): any;
  static getPlugin(name: any | string): any;
  static pluginWait(pluginFn: any, ...args): any;
  static pluginGet(pluginFn: any, ...args): any;
  static pluginAlter(pluginFn: any, value: any, ...args): any;
  static accessInfo(formio?: Formio): any;
  static pageQuery(): any;
  static oAuthCurrentUser(formio?: Formio, token?: any): any;
  static samlInit(options?: Object): any;
  static oktaInit(options?: Object): any;
  static ssoInit(type: any, options?: Object): any;
  static requireLibrary(name: any, property: any, src: any, polling?: boolean): any;
  static libraryReady(name: string): any;
}
