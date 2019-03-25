/**
 * Formats a phone number.
 * Example: 123-456-7890 => (123) 456-7890
 *
 * @param {String} phone
 * @return {Void}
 */
Vue.filter('phone', function (phone) {
    return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});