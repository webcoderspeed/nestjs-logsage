import { EXECUTION_LOG_CALLER, EXECUTION_LOG_START_TIME } from '../constants';
import { TraceIdHandler } from './trace-handler.util';

function formatLogMessage(...optionalParams: any[]) {
  const TRACE_ID = TraceIdHandler.getTraceIdField();

  let traceId = null;
  let restData = [];
  let executionTime = null;
  let executionCallerName = null;

  for (const item of optionalParams) {
    if (item && typeof item === 'object') {
      if (TRACE_ID in item) {
        traceId = item[TRACE_ID];
      }
      if (EXECUTION_LOG_START_TIME in item) {
        const currentTime = new Date().getTime();
        executionTime = currentTime - item[EXECUTION_LOG_START_TIME];
      }

      if (EXECUTION_LOG_CALLER in item) {
        executionCallerName = item[EXECUTION_LOG_CALLER];
      }
    }
    restData.push(item);
  }

  const formattedData = restData
    .map((d) => (typeof d === 'object' ? JSON.stringify(d) : d))
    .join(' ');

  let logMessage = formattedData;

  if (executionTime !== null) {
    logMessage = `[${executionCallerName ? executionCallerName + ': ' : ''}${executionTime} ms]:${logMessage}`;
  }

  if (traceId) {
    logMessage = `[${traceId}]:${logMessage}`;
  }

  return logMessage;
}

export default formatLogMessage;
