import * as Sqrl from 'squirrelly'
import { readFileSync } from 'fs'

Sqrl.defaultConfig.autoEscape = false 
var myTemplate = readFileSync('resources/views/testing.sqrl', 'utf8')

var data = {
    name: 'Squirrelly',
    script : `<script>console.log('keren')</script>`,
  }

  var result = Sqrl.render(myTemplate, data)

  console.log(result)