// import { redirect } from "next/navigation";
import { redirect } from "../../../navigation";
import { Alert } from "@/components/cms/swal";

class ResponseError extends Error {
  constructor(message, res) {
    super(message);
    this.response = res;
  }
}

export async function fetchWithErrorHandling(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401) {
      console.error("401 Unauthorized");
      throw new Error("401 Unauthorized");
      //   redirect("/unauthorized-redirect");
    }

    // if (response.status === 400) {
    //   console.error("400 Bad Request");
    //   throw new Error("400 Bad Request");
    // }

    if (response.status === 500) {
      // showInternalServerErrorDialog();

      console.error("500 Internal Server Error");
      throw new Error("500 Internal Server Error");
    }

    if (response.status === 405) {
      // showInternalServerErrorDialog();

      console.error("405 Method Not Allowed");
      throw new Error("405 Method Not Allowed");
    }
  }

  try {
    return await response.json();
  } catch (err) {
    console.error("Error parsing JSON:", err);
    throw new Error("Unexpected end of JSON input");
  }
}

export function handleError(err) {
  if (err) {
    console.error("handle" + err);
    switch (err.status) {
      case 400:
        console.error(`Bad request`);
        throw new Error("Bad request");

      case 401:
        console.error(" Unauthorized Unauthorized Unauthorized Unauthorized");
        // showUnauthorizedDialog();
        console.error("Unauthorized");
        throw new Error("Unauthorized");

      case 404:
        console.error("Not found");
        throw new Error("Not found");

      case 500:
        // showInternalServerErrorDialog();
        console.error("Internal server error");
        throw new Error("Internal server error");

      default:
        throw new Error(`Internal server error, ${err.response}`);

      // throw Error(`Unhandled fetch error, ${err}`);
    }
  }
}
