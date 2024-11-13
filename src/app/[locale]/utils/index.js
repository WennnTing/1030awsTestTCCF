export const localeToUpperCase = (locale) =>
  locale.charAt(0).toUpperCase() + locale.slice(1);

export const articelKeysFilter = async (templateId, formData, pageData) => {
  let filteredData = [];

  const generalKeysFilter = [
    "title",
    "content",
    "tag",
    "displayTitle",
    "displayTime",
    "leftFooterButton",
    "leftFooterButtonValue",
    "rightFooterButton",
    "rightFooterButtonValue",
    // "file",
  ];

  const listKeysFilter = [
    "title",
    "content",
    "leftFooterButton",
    "leftFooterButtonValue",
    "rightFooterButton",
    "rightFooterButtonValue",
    "block_theme",
    "block_title",
    "block_subTitle",
    "blcok_content",
    "block_button",
  ];

  const tableKeysFilter = [
    "title",
    "content",
    "leftFooterButton",
    "leftFooterButtonValue",
    "rightFooterButton",
    "rightFooterButtonValue",
    "header_1",
    "header_2",
    "header_3",
    "header_4",
    "header_5",
    "header_serial",
    "header_view",
    "theme",
    "notice",
    "serial",
    "viewButton",
    "row",
  ];

  const announcementKeysFilter = [
    "title",
    "cardFunction",
    "displayLocation",
    "buttonFunction",
    "displayCardImage",
    "card_article",
    "card_title",
    "card_image",
    "card_location",
    "card_button",
    "card_tag",
    "card_order",
  ];

  const eventKeysFilter = [
    "tag",
    "title",
    "summary",
    "kv",
    "location",
    "locationInfo",
    // "locationDisplayType",
    // "locationDisplayTypeValue",
    "eventType",
    "registrationStartDate",
    "registrationEndDate",
    "activityStartDate",
    "activityEndDate",
    "activityStartTime",
    "activityEndTime",
    "maxParticipants",
    "content",
    "slide_image",
    "member_title",
    "member_content",
    "member_image",
  ];

  switch (templateId) {
    case 1:
      filteredData = Array.from(formData.entries())
        .filter(([key, value]) =>
          generalKeysFilter.some((str) => key.includes(str))
        )
        .map(([key, value]) => {
          if (key.includes("display")) {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: value,
            };
          } else if (
            key.includes("Button") &&
            !key.includes("ButtonValue") &&
            !key.includes("ButtonEn")
          ) {
            return {
              elementId: key,
              fieldTextZh: value,
              fieldTextEn: formData.get(`${key}En`),
              fieldValue: formData.get(`${key}Value`),
            };
          } else if (!key.includes("En") && key.includes("content")) {
            return {
              elementId: key,
              fieldTextZh: value,
              fieldTextEn: formData.get(`${key}En`),
              fieldValue: "",
            };
          } else {
            if (
              !key.includes("Button") &&
              !key.includes("display") &&
              !key.includes("En") &&
              !key.includes("content")
            ) {
              return {
                elementId: key,
                fieldTextZh: value,
                fieldTextEn: formData.get(`${key}En`),
                fieldValue: "",
              };
            }
          }
        });

      return filteredData;

    case 2:
      filteredData = Array.from(formData.entries())
        .filter(([key, value]) =>
          listKeysFilter.some((str) => key.includes(str))
        )
        .map(([key, value]) => {
          if (
            key.includes("Button") &&
            !key.includes("ButtonValue") &&
            !key.includes("ButtonEn")
          ) {
            return {
              elementId: key,
              fieldTextZh: value,
              fieldTextEn: formData.get(`${key}En`),
              fieldValue: formData.get(`${key}Value`),
            };
          } else {
            if (
              !key.includes("Button") &&
              !key.includes("En") &&
              !key.includes("buttonValue")
            ) {
              if (key.includes("block") && !key.includes("En")) {
                if (key.includes("button") && !key.includes("buttonValue")) {
                  return {
                    elementId: key,
                    fieldTextZh: value,
                    fieldTextEn: formData.get(`${key}_En`),
                    fieldValue: formData.get(
                      `block_buttonValue_${key.split("_")[2]}`
                    ),
                  };
                } else {
                  if (!key.includes("buttonValue")) {
                    return {
                      elementId: key,
                      fieldTextZh: value,
                      fieldTextEn: formData.get(`${key}_En`),
                      fieldValue: "",
                    };
                  }
                }
              }

              return {
                elementId: key,
                fieldTextZh: value,
                fieldTextEn: formData.get(`${key}En`),
                fieldValue: "",
              };
            }
          }
        });

      return filteredData;

    case 3:
      filteredData = Array.from(formData.entries())
        .filter(([key, value]) =>
          tableKeysFilter.some((str) => key.includes(str))
        )
        .map(([key, value]) => {
          if (key === "header_serial") {
            return {
              elementId: key,
              fieldTextZh: formData.get(`${key}Value`),
              fieldTextEn: formData.get(`${key}ValueEn`),
              fieldValue: "",
            };
          } else if (key === "header_view") {
            return {
              elementId: key,
              fieldTextZh: formData.get(`${key}Value`),
              fieldTextEn: formData.get(`${key}ValueEn`),
              fieldValue: "",
            };
          } else if (
            key.includes("viewButton") &&
            !key.includes("En") &&
            !key.includes("viewButtonValue")
          ) {
            return {
              elementId: key,
              fieldTextZh: formData.get(`${key}`),
              fieldTextEn: formData.get(`${key}_En`),
              fieldValue: formData.get(`${key}Value`),
            };
          } else if (
            key === "leftFooterButton" ||
            key === "rightFooterButton"
          ) {
            return {
              elementId: key,
              fieldTextZh: formData.get(`${key}`),
              fieldTextEn: formData.get(`${key}En`),
              fieldValue: formData.get(`${key}Value`),
            };
          } else if (
            key.includes("header") &&
            !key.includes("En") &&
            !key.includes("view") &&
            !key.includes("serial")
          ) {
            return {
              elementId: key,
              fieldTextZh: value,
              fieldTextEn: formData.get(`${key}_En`),
              fieldValue: "",
            };
          } else if (
            key.includes("table") &&
            !key.includes("En") &&
            !key.includes("viewButtonValue")
          ) {
            return {
              elementId: key,
              fieldTextZh: value,
              fieldTextEn: formData.get(`${key}_En`),
              fieldValue: "",
            };
          } else {
            if (
              !key.includes("header") &&
              !key.includes("En") &&
              !key.includes("table") &&
              !key.includes("Button")
            ) {
              return {
                elementId: key,
                fieldTextZh: formData.get(`${key}`),
                fieldTextEn: formData.get(`${key}En`),
                fieldValue: "",
              };
            }
          }
        });

      return filteredData;

    case 4:
      filteredData = Array.from(formData.entries())
        .filter(([key, value]) =>
          announcementKeysFilter.some((str) => key.includes(str))
        )
        .map(async ([key, value]) => {
          if (key === "cardFunction" || key === "displayLocation") {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: value,
            };
          }

          if (key === "displayCardImage") {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: "",
              ImageBase64: await convertBase64(
                formData.get("displayCardImageValue")
              ),
            };
          }

          if (
            key.includes("card_button") &&
            !key.includes("buttonFunctionValue") &&
            !key.includes("En")
          ) {
            return {
              elementId: key,
              fieldTextZh: formData.get("buttonFunctionValue"),
              fieldTextEn: formData.get("buttonFunctionValueEn"),
              fieldValue: value,
            };
          } else if (key.includes("image") && !key.includes("En")) {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: "",
              ImageBase64: await convertBase64(formData.get(key)),
              imageUrl: pageData?.filter((data) => data.elementId === key)[0]
                ?.imageUrl,
            };
          } else {
            if (
              !key.includes("buttonFunction") &&
              !key.includes("En") &&
              !key.includes("displayCard")
            ) {
              if (key.includes("card") && !key.includes("En")) {
                if (key.includes("article")) {
                  return {
                    elementId: key,
                    fieldTextZh: "",
                    fieldTextEn: "",
                    fieldValue: value,
                  };
                } else {
                  return {
                    elementId: key,
                    fieldTextZh: value,
                    fieldTextEn: formData.get(`${key}_En`),
                    fieldValue: "",
                  };
                }
              }

              return {
                elementId: key,
                fieldTextZh: value,
                fieldTextEn: formData.get(`${key}En`),
                fieldValue: "",
              };
            }
          }
        });

      return Promise.all(filteredData);

    case 5:
      filteredData = Array.from(formData.entries())
        .filter(([key, value]) =>
          eventKeysFilter.some((str) => key.includes(str))
        )
        .map(async ([key, value]) => {
          if (
            key.includes("Date") ||
            key.includes("maxParticipants") ||
            key.includes("Time") ||
            key.includes("event") ||
            key.includes("file")
          ) {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: value,
            };
          } else if (
            (key.includes("image") && !key.includes("En")) ||
            (key.includes("kv") && !key.includes("En"))
          ) {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: "",
              ImageBase64: await convertBase64(formData.get(key)),
              imageUrl: pageData?.filter((data) => data.elementId === key)[0]
                ?.imageUrl,
            };
          } else if (key === "locationInfo") {
            return {
              elementId: key,
              fieldTextZh: "",
              fieldTextEn: "",
              fieldValue: formData.get("locationInfo"),
            };
          }
          // else if (
          //   key.includes("location") &&
          //   !key.includes("TypeValue") &&
          //   !key.includes("En") &&
          //   !key.includes("Info")
          // ) {
          //   return {
          //     elementId: key,
          //     fieldTextZh: value,
          //     fieldTextEn: formData.get(`${key}En`),
          //     fieldValue: formData.get(`${key}DisplayTypeValue`),
          //   };
          // }
          else {
            if (key.includes("member") && !key.includes("En")) {
              return {
                elementId: key,
                fieldTextZh: value,
                fieldTextEn: formData.get(`${key}_En`),
                fieldValue: "",
              };
            }
            if (
              !key.includes("En") &&
              !key.includes("Info") &&
              !key.includes("TypeValue")
            ) {
              return {
                elementId: key,
                fieldTextZh: value,
                fieldTextEn: formData.get(`${key}En`),
                fieldValue: "",
              };
            }
          }
        });

      return Promise.all(filteredData);

    default:
      break;
  }
};

export const articleRequiredCheck = (templateId, formData) => {
  const generalKeysFilter = [
    "title",
    "content",
    "displayTitle",
    "displayTime",
    "publish",
    "unpublish",
    "pageName",
    "routerName",
  ];

  const listKeysFilter = [
    "title",
    "content",
    "block_title",
    "block_subTitle",
    "blcok_content",
    "publish",
    "unpublish",
    "pageName",
    "routerName",
  ];

  const tableKeysFilter = [
    "title",
    "content",
    "serial",
    "serialEn",
    "serialValueEn",
    "viewButton",
    "viewButtonEn",
    "viewButtonValue",
    "viewButtonValueEn",
    "publish",
    "unpublish",
    "pageNameZh",
    "pageNameEn",
    "routerName",
  ];

  const announcementKeysFilter = [
    "title",
    "buttonFunction",
    "card_article",
    "card_title",
    "card_image",
    "card_location",
    "card_button",
    "card_tag",
    "card_order",
    "publish",
    "unpublish",
    "pageName",
    "routerName",
  ];

  const eventKeysFilter = [
    "title",
    "kv",
    "location",
    "locatinInfo",
    // "locationDisplayType",
    // "locationDisplayTypeValue",
    "eventType",
    "registrationStartDate",
    "registrationEndDate",
    "activityStartTime",
    "activityEndTime",
    "activityStartDate",
    "activityEndDate",
    "maxParticipants",
    "content",
    "member_content",
  ];

  const checkRequiredFields = (keys, data) => {
    let result;

    if (templateId == 3) {
      result = Array.from(data.entries()).every(([key, value]) => value !== "");
    } else if (templateId == 5) {
      result = Array.from(data.entries())
        .filter(([key, value]) =>
          keys.some((str) => key.includes(str) && !key.includes("member_title"))
        )
        .every(([key, value]) => value !== "");
    } else {
      result = Array.from(data.entries())
        .filter(([key, value]) => keys.some((str) => key.includes(str)))
        .every(([key, value]) => value !== "");
    }

    return result;
  };

  switch (templateId) {
    case "1":
      return checkRequiredFields(generalKeysFilter, formData);

    case "2":
      return checkRequiredFields(listKeysFilter, formData);

    case "3":
      return checkRequiredFields(tableKeysFilter, formData);

    case "4":
      return checkRequiredFields(announcementKeysFilter, formData);

    case "5":
      return checkRequiredFields(eventKeysFilter, formData);

    default:
      console.log("No matching templateId");
      break;
  }
};

export const convertBase64 = async (file) => {
  const image = file;
  const fileName = image.name;
  const fileType = image.type;
  const imageReader = image.stream().getReader();
  const imageDataU8 = [];

  while (true) {
    const { done, value } = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);
  }

  const imageBinary = Buffer.from(imageDataU8, "binary");
  const base64String = imageBinary.toString("base64");
  const dataUrl = base64String ? `data:${fileType};base64,${base64String}` : "";

  return dataUrl;
};
