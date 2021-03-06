import Layout from '../../components/layout'
import AllQuestions from '../../components/AllQuestions'

import { getAllQuestions } from '../../lib/questions';

export async function getStaticProps(){
    const questions = await getAllQuestions();
    return {
        props: { questions },
        revalidate: 60 * 60 // in seconds
    }
}

function AllQuestionsPage(props){
    return <AllQuestions questions={props.questions}/>
}

export default Layout(AllQuestionsPage);