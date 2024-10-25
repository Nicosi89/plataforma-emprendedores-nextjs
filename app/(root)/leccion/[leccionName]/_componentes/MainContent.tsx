import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';


const MainContent = ({
    numLeccion,
    dataCursos,
    leccionActualState 
    } : MainContentProps) => {

    return (
        <main className="flex overflow-hidden flex-col items-start px-20 max-w-full w-[1049px] max-md:px-5">
            <ContentHeader leccionActual={leccionActualState!} numLeccion={numLeccion} cursoActual={dataCursos} />
            <ContentBody leccionId={leccionActualState!._id} numLeccion={leccionActualState.numLeccion} cursoActual={dataCursos} />
            {/* <NavigationButtons /> */}
            {/* <PruebaProvider /> */}
        </main>
    );

};


export default MainContent;