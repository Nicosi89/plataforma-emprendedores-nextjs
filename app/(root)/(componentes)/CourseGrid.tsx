import CourseCard from './CourseCard';
import { courseData } from '../../../utils/constants'

const CourseGrid = () => {
  return (
    <section className="flex z-0 gap-10 justify-center items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
        {courseData.map((course) => (
          <CourseCard key={course.id} width={course.width} />
        ))}
      </div>
    </section>

  );

};


export default CourseGrid; 