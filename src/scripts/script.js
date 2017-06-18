import html from '../hypertext/index.html' // eslint-disable-line no-unused-vars
import css from '../styles/style.scss' // eslint-disable-line no-unused-vars

import $ from 'jquery'

$(document).ready(() => {
	$('.scripts-fail').hide()
	$('.scripts-success').show()
})