import {
  API_ROUTES,
  HYMN_TAB,
  INFO_TAB,
  INTRODUCE_TAB,
  MENU_TAB,
  NEWS_TAB,
  SERMON_TAB,
  SOUL_TYPE,
} from "@/app/(variables)/enums";

export const ROUTER_PATHS = {
  [MENU_TAB.INTRODUCE]: "/introduces",
  [MENU_TAB.SERMON]: "/sermons",
  [MENU_TAB.HYMN]: "/hymns",
  [MENU_TAB.NEWS]: "/news",
  [MENU_TAB.INFO]: "/infos",
};

export const API_PATHS = {
  [API_ROUTES.GET_HYMNS]: "/api/hymns",
  [API_ROUTES.GET_HYMN_BY_ID]: "/api/hymns/",
  [API_ROUTES.GET_SERMONS]: "/api/sermons",
  [API_ROUTES.GET_SERMON_BY_ID]: "/api/sermons/",
  [API_ROUTES.GET_COMMUNITIES]: "/api/communities",
  [API_ROUTES.GET_COMMUNITY_BY_ID]: "/api/communities/",
};

export const YOUTUBE_URL = {
  THUMB_NAIL: "https://img.youtube.com/vi/",
  EMBED: "https://www.youtube.com/embed/",
  CHANNEL: "https://www.youtube.com/@livingwaterflowingchurch482",
  VIEW: "https://www.youtube.com/watch?v=",
};

export const SOUL_CATEGORY = {
  [SOUL_TYPE.INTRODUCE]: "introduce",
  [SOUL_TYPE.MISSION]: "mission",
  [SOUL_TYPE.SPIRIT]: "spirit",
};

export const Menus = (t: any) => [
  {
    name: t("Introduce.name"),
    items: [
      {
        name: t("Introduce.pastor"),
        menuTab: MENU_TAB.INTRODUCE,
        detailTab: INTRODUCE_TAB.PASTOR,
      },
      {
        name: t("Introduce.introduce"),
        menuTab: MENU_TAB.INTRODUCE,
        detailTab: INTRODUCE_TAB.INTRODUCE,
      },
      {
        name: t("Introduce.worship"),
        menuTab: MENU_TAB.INTRODUCE,
        detailTab: INTRODUCE_TAB.WORSHIP,
      },
    ],
  },
  {
    name: t("Sermon.name"),
    items: [
      {
        name: t("Sermon.sermon"),
        menuTab: MENU_TAB.SERMON,
        detailTab: SERMON_TAB.RHEMA,
      },
      {
        name: t("Sermon.soul"),
        menuTab: MENU_TAB.SERMON,
        detailTab: SERMON_TAB.SOUL,
      },
    ],
  },
  {
    name: t("Hymn.name"),
    items: [
      {
        name: t("Hymn.hymn"),
        menuTab: MENU_TAB.HYMN,
        detailTab: HYMN_TAB.HYMN,
      },
      {
        name: t("Hymn.song"),
        menuTab: MENU_TAB.HYMN,
        detailTab: HYMN_TAB.SONG,
      },
    ],
  },
  {
    name: t("News.name"),
    items: [
      {
        name: t("News.service"),
        menuTab: MENU_TAB.NEWS,
        detailTab: NEWS_TAB.NEWS,
      },
      {
        name: t("News.event"),
        menuTab: MENU_TAB.NEWS,
        detailTab: NEWS_TAB.EVENT,
      },
      {
        name: t("News.story"),
        menuTab: MENU_TAB.NEWS,
        detailTab: NEWS_TAB.STORY,
      },
    ],
  },
  {
    name: t("Info.name"),
    items: [
      {
        name: t("Info.place"),
        menuTab: MENU_TAB.INFO,
        detailTab: INFO_TAB.LOCATION,
      },
    ],
  },
];
