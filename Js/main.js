"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // English and Hindi Translation Dictionary
    // ==========================================

    const translations = {
        en: {
            announcement: "Welcome to the Anand Nagar City Portal",
            location: "Maharajganj, Uttar Pradesh",
            brandName: "Anand Nagar",
            brandTagline: "Discover · Connect · Belong",

            navHome: "Home",
            navAbout: "About",
            navExplore: "Explore",
            navEvents: "Events",
            navDirectory: "Directory",
            navTransport: "Transport",
            navContact: "Contact",

            heroEyebrow: "A PLACE TO DISCOVER",
            heroTitleLine1: "Discover the charm of",
            heroTitleLine2: "Anand Nagar.",
            heroDescription:
                "Explore local places, discover community events, find useful services and stay connected with everything happening around your town.",
            heroExploreButton: "Explore the Town",
            heroAboutButton: "Discover Our Story",
            heroCaption: "YOUR TOWN. YOUR STORIES. YOUR COMMUNITY.",

            searchPlaceholder: "Search places, services...",
            searchButton: "Search",

            quickExplore: "Explore Places",
            quickEvents: "Local Events",
            quickDirectory: "Local Directory",
            quickTransport: "Transport",

            townImageFallback: "Anand Nagar",
            aboutBadge: "Our Town, Our Pride",
            aboutEyebrow: "A LITTLE ABOUT US",
            aboutTitle: "A town with its own story.",
            aboutParagraph1:
                "Known as Pharenda or Anandnagar, Anand Nagar is a town in Maharajganj district, Uttar Pradesh. Located in northern India near the Nepal border, it is approximately 44 kilometres north of Gorakhpur.",
            aboutParagraph2:
                "This city portal brings useful local information together in one place, helping residents and visitors discover the town, explore nearby places and stay connected with the community.",
            aboutLink: "Know More About Pharenda",

            factsEyebrow: "KNOW YOUR TOWN",
            factsTitle: "Pharenda at a glance.",
            factsDescription:
                "A few facts about Anand Nagar and its place in the region.",

            factDistrictLabel: "DISTRICT",
            factDistrictValue: "Maharajganj",
            factDistrictDetail: "Uttar Pradesh, India",

            factLocationLabel: "LOCATION",
            factLocationValue: "Near Nepal",
            factLocationDetail: "Northern Uttar Pradesh",

            factDistanceLabel: "APPROX. DISTANCE",
            factDistanceValue: "44 km",
            factDistanceDetail: "North of Gorakhpur",

            factElevationLabel: "ELEVATION",
            factElevationValue: "88 metres",
            factElevationDetail: "Above sea level",

            factsSource:
                "Geographic details are approximate. Source: Wikipedia's Pharenda article.",

            exploreEyebrow: "PLACES & EXPERIENCES",
            exploreTitle: "Explore Anand Nagar.",
            exploreDescription:
                "Discover places and experiences around your town.",
            exploreAll: "Explore All",

            templeImageFallback: "Nearby Temple",
            placeCategoryNearby: "NEARBY PLACE",
            templeTitle: "Lehara Devi Temple",
            templeDescription:
                "A temple dedicated to Durga Devi, located near Anand Nagar and known locally as Lehara Devi Mandir.",

            railwayImageFallback: "Anand Nagar Junction",
            placeCategoryTransport: "TRANSPORT",
            railwayTitle: "Anand Nagar Junction",
            railwayDescription:
                "The railway station serves Pharenda and connects the town with regional rail routes. Check current train information before travelling.",

            placeCategoryLocal: "LOCAL LIFE",
            localLifeTitle: "Discover Local Life",
            localLifeDescription:
                "Explore the town, its neighbourhoods and nearby markets. Add verified local recommendations as the portal grows.",

            learnMore: "Learn More",
            travelInfo: "Travel Information",
            discoverMore: "Discover More",

            eventsEyebrow: "COMMUNITY & CONNECTION",
            eventsTitle: "What's happening around town?",
            eventsDescription:
                "Stay connected with local celebrations, community gatherings and upcoming events. Event listings will be added as verified information becomes available.",
            eventsButton: "Share an Event",
            eventsArtText: "Together in Community",

            directoryEyebrow: "LOCAL CONNECTIONS",
            directoryTitle: "Find what you need.",
            directoryDescription:
                "A future directory for useful local services and community resources.",

            directoryHealth: "Healthcare",
            directoryHealthDesc:
                "Hospitals, clinics and healthcare services.",

            directoryEducation: "Education",
            directoryEducationDesc:
                "Schools, colleges and learning resources.",

            directoryBusiness: "Local Businesses",
            directoryBusinessDesc:
                "Shops, services and local businesses.",

            directoryTransport: "Transport",
            directoryTransportDesc:
                "Local and regional travel information.",

            directoryNote:
                "Directory listings are sample categories. Verified local listings can be added later.",

            transportEyebrow: "GETTING AROUND",
            transportTitle: "Plan your journey.",
            transportDescription:
                "Find useful travel information for Anand Nagar and nearby destinations.",
            transportButton: "Transport Information",

            contactEyebrow: "BE PART OF THE STORY",
            contactTitle: "Have something to share?",
            contactDescription:
                "Help make this city portal more useful by sharing suggestions, local information or community updates.",
            contactButton: "Get in Touch",

            footerDescription:
                "A community-focused city portal for discovering Anand Nagar and staying connected with local information.",
            footerExploreTitle: "Explore",
            footerUsefulTitle: "Useful Links",
            footerLocationTitle: "Location",
            country: "India",
            copyright: "Anand Nagar. All rights reserved.",
            footerMadeFor: "Made for the community.",

            searchEmpty: "Please enter a search term.",
            searchResult: "You searched for: "
        },

        hi: {
            announcement: "आनंद नगर सिटी पोर्टल में आपका स्वागत है",
            location: "महाराजगंज, उत्तर प्रदेश",
            brandName: "आनंद नगर",
            brandTagline: "खोजें · जुड़ें · अपनापन",

            navHome: "होम",
            navAbout: "हमारे बारे में",
            navExplore: "घूमें",
            navEvents: "कार्यक्रम",
            navDirectory: "स्थानीय सेवाएँ",
            navTransport: "यातायात",
            navContact: "संपर्क करें",

            heroEyebrow: "खोजने के लिए एक खूबसूरत जगह",
            heroTitleLine1: "आनंद नगर की खूबसूरती",
            heroTitleLine2: "को जानें।",
            heroDescription:
                "स्थानीय स्थानों को जानें, सामुदायिक कार्यक्रमों की जानकारी प्राप्त करें, उपयोगी सेवाएँ खोजें और अपने शहर की हर गतिविधि से जुड़े रहें।",
            heroExploreButton: "शहर घूमें",
            heroAboutButton: "हमारी कहानी जानें",
            heroCaption: "आपका शहर। आपकी कहानियाँ। आपका समुदाय।",

            searchPlaceholder: "स्थान और सेवाएँ खोजें...",
            searchButton: "खोजें",

            quickExplore: "घूमने की जगहें",
            quickEvents: "स्थानीय कार्यक्रम",
            quickDirectory: "स्थानीय सेवाएँ",
            quickTransport: "यातायात",

            townImageFallback: "आनंद नगर",
            aboutBadge: "हमारा शहर, हमारा गौरव",
            aboutEyebrow: "हमारे बारे में",
            aboutTitle: "अपनी एक खास पहचान वाला शहर।",
            aboutParagraph1:
                "फरेंदा या आनंदनगर के नाम से जाना जाने वाला आनंद नगर, उत्तर प्रदेश के महाराजगंज जिले का एक कस्बा है। यह उत्तर भारत में नेपाल सीमा के पास स्थित है और गोरखपुर से लगभग 44 किलोमीटर उत्तर में है।",
            aboutParagraph2:
                "यह सिटी पोर्टल स्थानीय उपयोगी जानकारी को एक ही स्थान पर उपलब्ध कराता है, जिससे निवासी और आगंतुक शहर को जान सकें, आसपास के स्थानों को देख सकें और समुदाय से जुड़े रह सकें।",
            aboutLink: "फरेंदा के बारे में और जानें",

            factsEyebrow: "अपने शहर को जानें",
            factsTitle: "एक नज़र में फरेंदा।",
            factsDescription:
                "आनंद नगर और क्षेत्र में इसकी स्थिति से जुड़ी कुछ जानकारी।",

            factDistrictLabel: "जिला",
            factDistrictValue: "महाराजगंज",
            factDistrictDetail: "उत्तर प्रदेश, भारत",

            factLocationLabel: "स्थान",
            factLocationValue: "नेपाल के निकट",
            factLocationDetail: "उत्तर प्रदेश का उत्तरी क्षेत्र",

            factDistanceLabel: "लगभग दूरी",
            factDistanceValue: "44 किमी",
            factDistanceDetail: "गोरखपुर से उत्तर",

            factElevationLabel: "समुद्र तल से ऊँचाई",
            factElevationValue: "88 मीटर",
            factElevationDetail: "समुद्र तल से",

            factsSource:
                "भौगोलिक विवरण अनुमानित हैं। स्रोत: विकिपीडिया का फरेंदा लेख।",

            exploreEyebrow: "स्थान और अनुभव",
            exploreTitle: "आनंद नगर को जानें।",
            exploreDescription:
                "अपने शहर के स्थानों और अनुभवों को जानें।",
            exploreAll: "सभी स्थान देखें",

            templeImageFallback: "आसपास का मंदिर",
            placeCategoryNearby: "आसपास का स्थल",
            templeTitle: "लेहड़ा देवी मंदिर",
            templeDescription:
                "आनंद नगर के पास स्थित दुर्गा देवी का मंदिर, जिसे स्थानीय रूप से लेहड़ा देवी मंदिर के नाम से जाना जाता है।",

            railwayImageFallback: "आनंद नगर जंक्शन",
            placeCategoryTransport: "यातायात",
            railwayTitle: "आनंद नगर जंक्शन",
            railwayDescription:
                "रेलवे स्टेशन फरेंदा को रेल सेवा प्रदान करता है और शहर को क्षेत्रीय रेल मार्गों से जोड़ता है। यात्रा से पहले वर्तमान ट्रेन जानकारी जाँचें।",

            placeCategoryLocal: "स्थानीय जीवन",
            localLifeTitle: "स्थानीय जीवन को जानें",
            localLifeDescription:
                "शहर, आसपास के क्षेत्रों और नज़दीकी बाज़ारों को जानें। पोर्टल के विस्तार के साथ सत्यापित स्थानीय सुझाव जोड़े जा सकते हैं।",

            learnMore: "और जानें",
            travelInfo: "यात्रा की जानकारी",
            discoverMore: "और खोजें",

            eventsEyebrow: "समुदाय और जुड़ाव",
            eventsTitle: "शहर में क्या हो रहा है?",
            eventsDescription:
                "स्थानीय उत्सवों, सामुदायिक आयोजनों और आगामी कार्यक्रमों से जुड़े रहें। सत्यापित जानकारी उपलब्ध होने पर कार्यक्रमों की सूची जोड़ी जाएगी।",
            eventsButton: "कार्यक्रम साझा करें",
            eventsArtText: "समुदाय के साथ",

            directoryEyebrow: "स्थानीय संपर्क",
            directoryTitle: "अपनी ज़रूरत की जानकारी पाएँ।",
            directoryDescription:
                "स्थानीय सेवाओं और सामुदायिक संसाधनों की उपयोगी निर्देशिका।",

            directoryHealth: "स्वास्थ्य सेवाएँ",
            directoryHealthDesc:
                "अस्पताल, क्लिनिक और स्वास्थ्य सेवाएँ।",

            directoryEducation: "शिक्षा",
            directoryEducationDesc:
                "स्कूल, कॉलेज और शिक्षा संबंधी जानकारी।",

            directoryBusiness: "स्थानीय व्यवसाय",
            directoryBusinessDesc:
                "दुकानें, सेवाएँ और स्थानीय व्यवसाय।",

            directoryTransport: "यातायात",
            directoryTransportDesc:
                "स्थानीय और क्षेत्रीय यात्रा की जानकारी।",

            directoryNote:
                "यह निर्देशिका अभी उदाहरण श्रेणियाँ दिखाती है। सत्यापित स्थानीय जानकारी बाद में जोड़ी जा सकती है।",

            transportEyebrow: "आवागमन",
            transportTitle: "अपनी यात्रा की योजना बनाएँ।",
            transportDescription:
                "आनंद नगर और आसपास के स्थानों के लिए उपयोगी यात्रा जानकारी पाएँ।",
            transportButton: "यातायात की जानकारी",

            contactEyebrow: "इस कहानी का हिस्सा बनें",
            contactTitle: "क्या आप कुछ साझा करना चाहते हैं?",
            contactDescription:
                "अपने सुझाव, स्थानीय जानकारी या सामुदायिक समाचार साझा करके इस सिटी पोर्टल को और उपयोगी बनाने में मदद करें।",
            contactButton: "संपर्क करें",

            footerDescription:
                "आनंद नगर को जानने और स्थानीय जानकारी से जुड़े रहने के लिए समुदाय-केंद्रित सिटी पोर्टल।",
            footerExploreTitle: "जानें",
            footerUsefulTitle: "उपयोगी लिंक",
            footerLocationTitle: "स्थान",
            country: "भारत",
            copyright: "आनंद नगर। सर्वाधिकार सुरक्षित।",
            footerMadeFor: "समुदाय के लिए बनाया गया।",

            searchEmpty: "कृपया खोजने के लिए कुछ लिखें।",
            searchResult: "आपने खोजा: "
        }
    };


    // ==========================================
    // Language Switching
    // ==========================================

    const languageButton = document.getElementById("languageButton");

    const savedLanguage = localStorage.getItem("anandNagarLanguage");
    let currentLanguage = savedLanguage === "hi" ? "hi" : "en";

    function applyLanguage(language) {
        currentLanguage = language;

        // Update all translated text
        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const translationKey = element.getAttribute("data-i18n");
            const translatedText = translations[language][translationKey];

            if (translatedText !== undefined) {
                element.textContent = translatedText;
            }
        });

        // Update placeholders
        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
            const translationKey = element.getAttribute("data-i18n-placeholder");
            const translatedText = translations[language][translationKey];

            if (translatedText !== undefined) {
                element.placeholder = translatedText;
            }
        });

        // Update HTML language attribute
        document.documentElement.lang = language;

        // Update language button
        if (languageButton) {
            languageButton.textContent = language === "en" ? "हिन्दी" : "English";
            languageButton.setAttribute(
                "aria-label",
                language === "en" ? "Switch to Hindi" : "Switch to English"
            );
        }

        // Save language preference
        localStorage.setItem("anandNagarLanguage", language);
    }

    if (languageButton) {
        languageButton.addEventListener("click", function () {
            const newLanguage = currentLanguage === "en" ? "hi" : "en";
            applyLanguage(newLanguage);
        });
    }

    // Apply saved language when page loads
    applyLanguage(currentLanguage);


    // ==========================================
    // Mobile Navigation
    // ==========================================

    const menuButton = document.getElementById("mobileMenuButton");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 850) {
                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }


    // ==========================================
    // Homepage Search
    // ==========================================

    const searchForm = document.getElementById("heroSearchForm");
    const searchInput = document.getElementById("citySearchInput");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const searchText = searchInput.value.trim();

            if (!searchText) {
                alert(translations[currentLanguage].searchEmpty);
                searchInput.focus();
                return;
            }

            // Frontend-only search feedback for now
            const message =
                translations[currentLanguage].searchResult + searchText;

            alert(message);
        });
    }


    // ==========================================
    // Footer Current Year
    // ==========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});