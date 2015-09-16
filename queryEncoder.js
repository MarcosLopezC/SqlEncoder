(function($) {
	"use strict";

	var source = $("textarea.source");

	var extract = function(line) {
		return {
			padding: /^(\s+)|/.exec(line)[1],
			text: line.trim()
		};
	};

	var encode = function(line, isLast) {
		var parts = extract(line);
		var output = [];

		if (line.trim() === "") {
			return "";
		}

		output.push(parts.padding);
		output.push('@"');
		output.push(parts.text.replace(/"/g, '""'));
		if (isLast) {
			output.push('";');
		}
		else {
			output.push(' " +')
		}

		return output.join("");
	};

	var decode = function (line) {
		return line
			.replace(/@"/, '')
			.replace(/(";|\s"\s\+)/, '')
			.replace(/""/g, '"');
	};

	$("button.encode").click(function() {
		var lines = source.val().split("\n");
		var i, length;

		for (i = 0, length = lines.length; i < length; i += 1) {
			lines[i] = encode(lines[i], i >= length - 1);
		}

		source.val(lines.join("\n"));
	});

	$("button.decode").click(function() {
		var lines = source.val().split("\n");
		var i, length;

		for (i = 0, length = lines.length; i < length; i += 1) {
			lines[i] = decode(lines[i]);
		}

		source.val(lines.join("\n"));
	});

}(jQuery));
