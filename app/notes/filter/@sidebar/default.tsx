import Link from "next/link";

import { tags } from "@/app/constants/tags";
import css from "./SidebarNotes.module.css";

const NotesSidebar = () => {
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
      </ul>
    </div>
  );
};

export default NotesSidebar;
