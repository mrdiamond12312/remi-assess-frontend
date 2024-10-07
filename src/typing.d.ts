declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "omit.js";
declare module "numeral";
declare module "@antv/data-set";
declare module "mockjs";
declare module "react-fittext";
declare module "bizcharts-plugin-slider";

declare type TComponentsProps = {
  children?: React.ReactNode;
};

declare type TMeta = {
  statusCode: number;
  message: string;
  error: string;
};

declare type TMetaWrapper<T> = {
  meta: TMeta;
  result: {
    data: T;
  };
};

declare interface ILinkPreviousRoute {
  from: string;
}

declare interface IPaginationResponse<T> {
  data: T[];
  meta: IPaginationMeta;
  extra?: any;
}

declare type TPropsFormInput = {
  control?: Control;
  name: string;
  type?: string;
  size?: SizeType;
  error?: MultipleFieldErrors;
  errors?: MultipleFieldErrors;
  placeholder?: string;
  className?: string;
  format?: string;
  values?: [];
  autoSize?: boolean | { minRows: number; maxRows: number };
  label?: string;
  children?: JSX.Element;
  required?: boolean;
  placement?: TooltipPlacement;
  disabled?: boolean;
  rows?: number;
  form?: FormInstance<any>;
  onSubmit?: any;
};
