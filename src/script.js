import './index.html'
import './style.scss'
import './favicon.png'

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.test__case--scripts.test__case--fail').style.display = 'none'
	document.querySelector('.test__case--scripts.test__case--pass').style.display = 'inline'
})