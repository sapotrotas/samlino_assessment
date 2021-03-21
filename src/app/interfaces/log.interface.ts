export class LogType {
  private _id: number;
  private _color: string;
  private static idCounter = 0;

  constructor(color: string) {
      this._id = LogType.idCounter++;
      this._color = color;
  }

  get counter(): number {
      return LogType.idCounter;
  }

  get id(): number {
      return this._id;
  }

  get color(): string {
      return this._color;
  }
}

export class LogMessage {
  private _message;
  private _logType;

  constructor(message: string, logType: LogType) {
      this._message = message;
      this._logType = logType;
  }

  get message(): string {
      return this._message;
  }

  get logType(): LogType {
      return this._logType;
  }
}

export const logTypes: { [index: string]: any } = {
  DEBUG: new LogType('#fc46aa'),
  LOG: new LogType('#2b2b2b'),
  INFO: new LogType('#219949'),
  WARN: new LogType('#e2cc04'),
  ERROR: new LogType('#d10000'),
};

export function log(caller: any, message: string, type?: LogType): void {
  let className = caller.constructor.name.toString().toUpperCase();
  let msg = `%c${className} ` + '%c' + message;
  let classStyle = `font-weight: bold`;
  let style: string = `color: #${logTypes.LOG.color}`;

  if (type) {
      style = `color: ${type.color}`;
  }

  console.log(msg, classStyle, style);
}
