
## Piwik Api report
 Simple helper for generate piwik report requests

### Example

```javasript
const Piwik = require('./Piwik')
const params = {
      token: 'tokendata', // required
      idSite: 99,
      filter_limit: 100,
      format: 'JSON',
      format_metrics: 1,
      expanded: 0
    }
const piwik = new Piwik(params)

const report1 = {
  dateFrom: '2016-12-01',
  dateTo: '2017-01-10',
  method: 'Contents.getContentNames',
  period: 'range',
  name: 'Name1',
  piece: 'Piece1'
}

const report2 = {
  dateFrom: '2016-12-01',
  dateTo: '2016-12-31',
  method: 'Contents.getContentNames',
  period: 'range',
  name: 'Name2',
  piece: 'Piece2'
}

const reports = [report1, report2]

const reportPartialUrl = piwik.bulk(reports) 

constole.log(reportPartialUrl)
/*
  module=API&format=JSON&token_auth=token&idSite=1&format_metrics=1&expanded=false&filter_limit=30&method=API.getBulkRequest'+
    '&urls[]=method=Contents.getContentNames&period=range&date=2016-12-01,2017-01-10&label=Name1 &gt; @Piece1'+
    '&urls[]=method=Contents.getContentNames&period=range&date=2016-12-01,2016-12-31&label=Name2 &gt; @Piece2&
*/

```
