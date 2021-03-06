// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    username?: string;
    autoLogin?: boolean;
    nickname?: string;
    uuid?: string;
    avatar?: string;
    access?: string;
    code?: boolean;
    userType?: {
      ID?: number;
      type?: string;
    };
  };

  type LoginResult = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username: string;
    password: string;
    autoLogin?: boolean;
    nickname?: string;
    uuid?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  type CourseList = {
    code?: number;
    msg?: string;
    data: Course[];
  };

  type Course = {
    courseName?: string;
    teacher?: any;
    ID?: any;
    machineConfig?: any;
    image?: any;
    status?: any;
    CreatedAt?: any;
  };
  type VMList = {
    code?: number;
    msg?: string;
    data: VM[];
  };

  type VM = {
    name: string;
    ID: number;
    ip?: string;
    creator?: {
      username: string;
    };
    config?: string;
    sourceCourse?: {
      courseName?: string;
      machineConfig?: {
        cpu?: number;
        ram?: number;
      };
    };
    Status?: {
      Status?: string;
    };
    CreatedAt?: any;
  };
  type ImageList = {
    code?: number;
    msg?: string;
    data?: Image[];
  };

  type Image = {
    name?: string;
    type?: string;
    location?: string;
    generateType?: string;
    ID?: number;
    creator?: {
      username?: string;
    };
    CreatedAt?: any;
    UpdatedAt?: any;
  };

  type MachineConfigList = {
    code?: number;
    msg?: string;
    data?: MachineConfig[];
  };
  type MachineConfig = {
    ID?: number;
    cpu?: number;
    ram?: number;
  };

  type NewCourseOpts = {
    courseName?: string;
    imageName?: string;
    note?: string;
    configs?: number;
  };

  type ModifyCourseOpt = {
    id?: number;
    courseName?: string;
    imageName?: string;
    note?: string;
    configs?: number;
  };

  type NewVMOpts = {
    instanceName?: string;
    courseName?: string;
  };
}
