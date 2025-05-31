	// DOM Elements
	const passwordOutput = document.getElementById('passwordOutput')
	const lengthSlider = document.getElementById('lengthSlider')
	const lengthValue = document.getElementById('lengthValue')
	const includeUppercase = document.getElementById('includeUppercase')
	const includeLowercase = document.getElementById('includeLowercase')
	const includeNumbers = document.getElementById('includeNumbers')
	const includeSymbols = document.getElementById('includeSymbols')
	const generateButton = document.getElementById('generateButton')
	const copyButton = document.getElementById('copyButton')
	const copyTooltip = document.getElementById('copyTooltip')

	// Character sets
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
	const numberChars = '0123456789'
	const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~'

	// Update length display
	lengthSlider.addEventListener('input', () => {
		lengthValue.textContent = lengthSlider.value
	})

	// Generate password function
	function generatePassword() {
		const length = parseInt(lengthSlider.value)
		let charset = ''
		let password = ''
		let tempPasswordOutput = 'P@$$wOrd'

		if (includeUppercase.checked) charset += uppercaseChars
		if (includeLowercase.checked) charset += lowercaseChars
		if (includeNumbers.checked) charset += numberChars
		if (includeSymbols.checked) charset += symbolChars

		if (charset === '') {
			tempPasswordOutput = 'Select options!'
			passwordOutput.classList.add('text-pink-400')
			setTimeout(() => {
				passwordOutput.textContent = 'P@$$wOrd'
				passwordOutput.classList.remove('text-pink-400')
			}, 2000)
			passwordOutput.textContent = tempPasswordOutput
			return
		}
		passwordOutput.classList.remove('text-pink-400')

		let guaranteedChars = []
		if (includeUppercase.checked)
			guaranteedChars.push(
				uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
			)
		if (includeLowercase.checked)
			guaranteedChars.push(
				lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
			)
		if (includeNumbers.checked)
			guaranteedChars.push(
				numberChars[Math.floor(Math.random() * numberChars.length)]
			)
		if (includeSymbols.checked)
			guaranteedChars.push(
				symbolChars[Math.floor(Math.random() * symbolChars.length)]
			)

		for (let i = guaranteedChars.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[guaranteedChars[i], guaranteedChars[j]] = [
				guaranteedChars[j],
				guaranteedChars[i],
			]
		}

		password = guaranteedChars.slice(0, length).join('')

		const remainingLength = length - password.length
		for (let i = 0; i < remainingLength; i++) {
			if (charset.length === 0) break
			const randomIndex = Math.floor(Math.random() * charset.length)
			password += charset[randomIndex]
		}

		password = password
			.split('')
			.sort(() => 0.5 - Math.random())
			.join('')

		if (password.length > length) {
			password = password.substring(0, length)
		}
		while (password.length < length && charset.length > 0) {
			password += charset[Math.floor(Math.random() * charset.length)]
		}

		passwordOutput.textContent = password
	}

	// Copy to clipboard function
	copyButton.addEventListener('click', () => {
		const passwordToCopy = passwordOutput.textContent
		if (
			passwordToCopy &&
			passwordToCopy !== 'P@$$wOrd' &&
			passwordToCopy !== 'Select options!'
		) {
			const tempTextArea = document.createElement('textarea')
			tempTextArea.value = passwordToCopy
			tempTextArea.style.position = 'absolute'
			tempTextArea.style.left = '-9999px'
			document.body.appendChild(tempTextArea)
			tempTextArea.select()
			tempTextArea.setSelectionRange(0, 99999)

			try {
				document.execCommand('copy')
				copyTooltip.textContent = 'Copied!'
				copyButton.parentElement.classList.add('active')
			} catch (err) {
				copyTooltip.textContent = 'Failed to copy'
				copyButton.parentElement.classList.add('active')
				console.error('Failed to copy password: ', err)
			}
			document.body.removeChild(tempTextArea)

			setTimeout(() => {
				copyTooltip.textContent = 'Copy to clipboard'
				copyButton.parentElement.classList.remove('active')
			}, 1500)
		}
	})

	generateButton.addEventListener('click', generatePassword)

	lengthValue.textContent = lengthSlider.value
	generatePassword()