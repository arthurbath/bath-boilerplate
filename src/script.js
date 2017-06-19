import html from './index.html' // eslint-disable-line no-unused-vars
import css from './style.scss' // eslint-disable-line no-unused-vars
import favicon from './favicon.png' // eslint-disable-line no-unused-vars

import $ from 'jquery'

$(document).ready(() => {
	$('.test__case--scripts.test__case--fail').hide()
	$('.test__case--scripts.test__case--pass').show()
})