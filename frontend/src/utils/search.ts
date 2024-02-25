import { WikiPage } from "../components/types";
import { SEARCH_HISTORY_KEY } from "../contants/common";


/**
 * Will store the search history in local storage. This will make sure latest 10 search queries are
 * stored in localStorage in FIFO order
 * @param key
 * @param value
 */
export function saveSearchHistory(value: string) {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)?.split(',') || [];
    history.push(value);
    if(history.length > 10) {
        history.shift();
    }
    localStorage.setItem(SEARCH_HISTORY_KEY, history.join());
}


/**
 * This util will return the searched history in revere order latest searched query at the end
 * @param key
 * @param value
 */
export function getSearchHistory() {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)?.split(',') || [];
    return history.reverse();
}

export function sortWikipediaResult(items: Array<WikiPage>): Array<WikiPage> {
    const history = getSearchHistory();

    history.forEach((pastQuery) => {
        items.sort((q1, q2) => {

            const q1Result = q1.title.toLowerCase().search(pastQuery.toLowerCase());
            const q2Result = q2.title.toLowerCase().search(pastQuery.toLowerCase());
            if(q1Result === q2Result) {
                return 0;
            }
            return q1Result > 0 ? 1 : -1;
        });
    });

    return items;
}
