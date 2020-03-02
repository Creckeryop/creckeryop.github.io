function getStars(repo_name, item, index) {
    $.ajax({
        url: "https://api.github.com/repos/creckeryop/" + repo_name,
        type: "GET",
        complete: function(jqXHR, status) {
            if (status == "success") {
                var result = jqXHR.responseText;
                var trimmed = result.substring(0, result.lastIndexOf('"watchers_count": '));
                var trimmed2 = trimmed.substring(trimmed.lastIndexOf('"stargazers_count": '), trimmed.lastIndexOf(","));
                item[index] = trimmed2.substring(trimmed2.lastIndexOf(':') + 1);
            }
        }
    });
}

function getDownloads(repo_name, item, index) {
    $.ajax({
        url: "https://api.github.com/repos/creckeryop/" + repo_name + "/releases",
        type: "GET",
        complete: function(jqXHR, status) {
            if (status == "success") {
                var count = 0
                var result = jqXHR.responseText;
                var splits = result.split("\n");
                for (i = 0; i < splits.length; i++) {
                    var line = splits[i];
                    if (line.indexOf("download_count") >= 0) {
                        var c = parseInt(line.substring(line.indexOf(":") + 2, line.indexOf(",")));
                        count = count + c;
                    }
                }
                item[index] = count;
            }
        }
    });
}

function get(repo_name, item, index) {
    $.ajax({
        url: "https://api.github.com/repos/creckeryop/" + repo_name + "/releases",
        type: "GET",
        complete: function(jqXHR, status) {
            if (status == "success") {
                var count = 0
                var result = jqXHR.responseText;
                var splits = result.split("\n");
                for (i = 0; i < splits.length; i++) {
                    var line = splits[i];
                    if (line.indexOf("download_count") >= 0) {
                        var c = parseInt(line.substring(line.indexOf(":") + 2, line.indexOf(",")));
                        count = count + c;
                    }
                }
                item[index] = count;
            }
        }
    });
}
var star_counters = document.getElementsByClassName("star-counter");
for (i = 0; i < star_counters.length; i++) {
    var item = star_counters.item(i);
    var repo_name = item.id.substring(0, item.id.lastIndexOf("-"));
    getStars(repo_name, item, "innerHTML");
}
var dwld_counters = document.getElementsByClassName("download-counter");
for (i = 0; i < dwld_counters.length; i++) {
    var item = dwld_counters.item(i);
    var repo_name = item.id.substring(0, item.id.lastIndexOf("-"));
    getDownloads(repo_name, item, "innerHTML");
}