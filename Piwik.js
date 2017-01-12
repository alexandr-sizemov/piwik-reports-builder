/**
 * @param  string url [piwik server url]
 * @param  string token [auth token]
 * @param  array params [list of default params]
 * @return Piwik istance
 * See piwik docs for details:
 *  http://developer.piwik.org/api-reference/reporting-api
 */

class Piwik {

  constructor(params = {}) {

    // will be taken from config
    const defaultParams = {
          idSite: 1,
          filter_limit: 30,
          format: 'JSON',
          format_metrics: 1,
          expanded: false
    }

    if(typeof params.token === 'undefined') throw Error("Token param required")

    this.params = Object.assign(defaultParams, params)
    
  }

  // methods 

  /**
  * @params Object { idSite, filter_limit, format, format_metrics, expanded }
  * @return String api string with standart paramenters
  */
  getBaseApiUrl(params) {
    const { idSite, filter_limit, format, format_metrics, expanded, token } = params
    const templateParams = [
      `?module=API`,
      `format=${format}`,
      `token_auth=${token}`,
      `idSite=${idSite}`,
      `format_metrics=${format_metrics}`,
      `expanded=${expanded}`,
      `filter_limit=${filter_limit}` // default 100, -1 for all
    ]
    return templateParams.join('&')
  }

  /**
  * @report Object { dateFrom, dateTo, method, period, name, piece }
  * @return {[type]}
  */
  getReport (reportParams) {
    const { dateFrom, dateTo, method, period, name, piece } = reportParams
    const label = `${name} &gt; @${piece}`
    const date = `${dateFrom},${dateTo}`
    return `method=${method}&period=${period}&date=${date}&label=${label}`
  }

  /**
  * @reports Array list of report Objects 
  * @return String full piwik bulk report url
  */
  bulk (reports) {

    const baseApiUrl = this.getBaseApiUrl(this.params)
    const bulkMethod = `API.getBulkRequest`
    const reportBuilder = this.getReport
    const reportRequests = reports.map(reportBuilder)
    const bulkRequst = reportRequests.reduce( (bulkRequest, request) => bulkRequest+'urls[]='+request+'&', '')
    return `${baseApiUrl}&method=${bulkMethod}&${bulkRequst}` 
  }

}

module.exports = Piwik