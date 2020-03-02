let language_table = {
    ["Lua"]: "blue",
    ["C++"]: "red",
    ["JavaScript"]: "yellow"
};

function loadProjectInfo(repo, item) {
    let star_label = item.getElementsByClassName("star-counter").item(0);
    let lngg_label = item.getElementsByClassName("project-language").item(0);
    $.ajax({
        url: "https://api.github.com/repos/creckeryop/" + repo,
        type: "GET",
        complete: function(jqXHR, status) {
            if (status == "success") {
                let result = jqXHR.responseText;
                star_label.innerHTML = /watchers_count": (.+),/.exec(result)[1];
                lngg_label.innerHTML = /language": "(.+)",/.exec(result)[1];
                lngg_label.style.color = language_table[lngg_label.innerHTML] || "black";
            }
        }
    });
    let dwld_label = item.getElementsByClassName("download-counter").item(0);
    $.ajax({
        url: "https://api.github.com/repos/creckeryop/" + repo + "/releases",
        type: "GET",
        complete: function(jqXHR, status) {
            if (status == "success") {
                let count = 0;
                let result = jqXHR.responseText;
                let splits = result.split("\n");
                let i = 0;
                for (; i < splits.length; i++) {
                    let line = splits[i];
                    if (line.indexOf("download_count") >= 0) {
                        let c = parseInt(line.substring(line.indexOf(":") + 2, line.indexOf(",")));
                        count = count + c;
                    }
                }
                dwld_label.innerHTML = count;
            }
        }
    });
}

function loadProjectsInfo() {
    let items = document.getElementsByClassName("project-item");
    let i = 0;
    for (; i < items.length; i++) {
        let item = items.item(i);
        loadProjectInfo(item.id, item);
    }
}

loadProjectsInfo();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});