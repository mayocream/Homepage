import m from 'mithril'
import Polyglot from 'node-polyglot'
const i18n = new Polyglot()


const languages = {
	ja: require("./common/lang/ja.json"),
	zh: require("./common/lang/zh.json")
}

let L = {
	lang: function() {
		let l = localStorage.getItem("lang") || null
		return l
	},
	set: function(l) {
		i18n.extend(languages[l])
		localStorage.setItem("lang", l)
	},
	init: function() {
		if (L.lang()) {
			L.set(L.lang())
		} else {
			navigator.language.substr(0,2) == 'zh' ? L.set('zh') : L.set('ja')
		}
	},
	switch: function() {
		L.lang() == "ja" ? L.set("zh") : L.set("ja")
	}
}

L.init()

let Aside = {
	view: function() {
		return m("aside.pic",
			m("h3", i18n.t("Subtitle"))
		)
	}
}

let Layout = {
	oncreate: function() {
	 document.body.className = L.lang()
	},
	onupdate: function() {
	 document.body.className = L.lang()
	},
	view: function(vnode) {
		return [
			m("section.main", vnode.children),
			m(Aside)
		]
	}
}

let Home = {
	menu: function() {

	},
	view: function() {
		return [
			m("header.header",
				m("h1.title", ["想い", m("span.sub-title", "~ Homepage ~")])
			),
			m("ul.nav", [
				m("li", m("a[href=//xn--n8ju97lh4k.moe]", i18n.t("Blog"))),
				m("li", [
					m("a[href=//flower.bun.moe]", i18n.t("Hana"))
				]),
				m("li", m("a.forbidden", i18n.t("Message"))),
				m("li", m("a[href=//xn--n8ju97lh4k.moe/about]", {oncreate: m.route.link}, i18n.t("About"))),
				m("ul.contact",
					m("li", m("a[href=//twitter.com/Mayocream39]", i18n.t("Twitter"))),
					m("li", m("a[href=//telegram.me/@mayocream]", i18n.t("Telegram"))),
					m("li", m("a[href=mailto:mayocream39@yahoo.co.jp]", i18n.t("Email")))
				)
			]),
			m("footer", m("a", {onclick:L.switch}, i18n.t("Lang")))
		]
	}
}

let About = {
	view: function() {
		return [
			m("header.header", [
				m("h2.title", i18n.t("About"))
			]),
			m("article.content", [
				m("p", "你好")
			])
		]
	}
}


m.route.prefix("")
m.route(document.body, "/", {
	"/": {
		view: function() {
			return m(Layout, m(Home))
		}
	},
	"/about": {
		view: function() {
			return m(Layout, m(About))
		}
	}
})
