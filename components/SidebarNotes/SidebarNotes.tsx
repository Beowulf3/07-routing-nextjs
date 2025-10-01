import Link from "next/link";

import css from "./SidebarNotes.module.css";
import { tags } from "@/app/constants/tags";

const SidebarNotes = () => {
  return (
    <div>
      <ul className={css.menuList}>
        {tags.map((tag) => {
          return (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          );
        })}
        {/* <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Work`} className={css.menuLink}>
            Work
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Personal`} className={css.menuLink}>
            Personal
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Meeting`} className={css.menuLink}>
            Meeting
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Shopping`} className={css.menuLink}>
            Shopping
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Todo`} className={css.menuLink}>
            Todo
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default SidebarNotes;
