/**
 * to remove the console.* statements from the string templates
 * @param source
 * @returns {*}
 */
module.exports = function (source) {
	// Regular expression to match and remove all console.* statements
	return source.replace(/console\.\w+\(.*?\);?/g, '');
};