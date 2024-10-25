import React from 'react';


interface CourseCardProps {

  width: string;

}


const CourseCard: React.FC<CourseCardProps> = ({ width }) => {

  return (

    <article className="flex grow shrink bg-zinc-300 h-[319px] min-w-[240px] rounded-[35px]" style={{ width }}>
    </article>

  );

};


export default CourseCard; 