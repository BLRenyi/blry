from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Max
import json
from .models import RegisterUser
from .models import RegisterStep, RegisterQuestion, RegisterStepQuestion, RegisterQuestionOption
from .models import RegisterAnswer, RegisterUserStep
import pprint
from .serializers import RegisterUserSerializer
from .serializers import RegisterQuestionSerializer, RegisterStepSerializer, RegisterStepQuestionSerializer, RegisterQuestionOptionSerializer
from .serializers import RegisterAnswerSerializer, RegisterUserStepSerializer
from .serializers import RegisterUserStepDisplaySerializer
from .services import retrieve_register_user, add_user_step, update_user_step_with_questions, validate_register_token, get_user_step_with_questions

# For the user to register
@api_view(['POST'])
def get_user_by_username(request):
    username = request.POST.get('username')
    token = request.POST.get('token')
    #print('get_user_by_username')
    #print(username)
    user = retrieve_register_user(username, token)
    serializer = RegisterUserSerializer(user)
    return Response(serializer.data)
@api_view(['GET'])
def get_user_by_register_id(request): 
    register_id_req = request.GET.get('registerid') 
    try:
        user = RegisterUser.objects.get(register_id = register_id_req)
    except RegisterUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = RegisterUser(user)
    return Response(serializer.data)   
@api_view(['GET', 'PUT', 'DELETE'])
def edit_user(request, pk):
    try:
        user = RegisterUser.objects.get(pk=pk)
    except RegisterUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = RegisterUserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RegisterUserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer, status=status.HTTP_400_BAD_REQUEST)    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
@api_view(['POST'])
def get_sys_step(request):
    step_id_req = request.POST.get('stepid') 
    try:
        step = RegisterStep.objects.get(step_id = step_id_req)
    except RegisterStep.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = RegisterStepSerializer(step)
    return Response(serializer.data)
@api_view(['POST'])
def get_sys_step_question(request):
    step_id_req = request.POST.get('stepid') 
    try:
        step = RegisterStep.objects.get(step_id = step_id_req)
    except RegisterStep.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    step_questions = list(RegisterStepQuestion.objects
        .filter(step_id = step_id_req))
    serializer = RegisterStepQuestionSerializer(step_questions, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_all_sys_step_question(request):
    step_questions = list(RegisterStepQuestion.objects.all())
    serializer = RegisterStepQuestionSerializer(step_questions, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_all_sys_question(request):
    questions = list(RegisterQuestion.objects.all())
    serializer = RegisterQuestionSerializer(questions, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_sys_question_by_step(request):
    step_id_req = request.GET.get('stepid') 
    question_id_list = RegisterStepQuestion.objects.filter(step_id = step_id_req).values_list('question_id', flat=True)
    questions = list(RegisterQuestion.objects.filter(question_id__in = question_id_list))
    serializer = RegisterQuestionSerializer(questions, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_sys_question_option(request): 
    question_options = list(RegisterQuestionOption.objects.all())
    serializer = RegisterQuestionOptionSerializer(question_options, many=True)
    return Response(serializer.data)
@api_view(['POST'])
def get_user_all_steps(request):
    register_id_req = request.POST.get('registerid')
    token_req = request.POST.get('token')
    is_register_valid = validate_register_token(register_id_req, token_req)
    if is_register_valid == True:
        add_user_step(register_id_req)
        user_steps = list(RegisterUserStep.objects.filter(register_id = register_id_req))    
        serializer = RegisterUserStepSerializer(user_steps, many=True)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.data)
@api_view(['POST'])
def get_all_user_answers(request):
    register_id_req = request.POST.get('registerid')
    step_answers = list(RegisterAnswer.objects
        .filter(register_id = register_id_req))
    serializer = RegisterAnswerSerializer(step_answers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_step(request): 
    register_id_req = request.POST.get('registerid')
    step_id_req = request.POST.get('stepid') 
    token_req = request.POST.get('token')
    is_register_valid = validate_register_token(register_id_req, token_req)
    if is_register_valid == True:
        user_step = RegisterUserStep.objects.get(register_id = register_id_req, step_id = step_id_req)
        serializer = RegisterUserStepSerializer(user_step)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def get_user_full_step(request):
    register_id_req = request.POST.get('registerid')
    step_id_req = request.POST.get('stepid') 
    token_req = request.POST.get('token')
    is_register_valid = validate_register_token(register_id_req, token_req)
    user_step = RegisterUserStep.objects.get(register_id = register_id_req, step_id = step_id_req)
    if is_register_valid == True:
        step_questions, answers = get_user_step_with_questions(register_id_req, step_id_req)
        display_answers = [] 
        question_options_all = list(RegisterQuestionOption.objects.all())
        for step_quetion in step_questions:
            try:
                question_options = [item for item in question_options_all if item.question_id == step_quetion.question_id]
            except:
                question_options = None
            try:
                answer = next((x for x in answers if x.question_id == step_quetion.question_id), None)
            except:
                answer = None
            if answer == None:
                display_answers.append(
                    {'step_question': step_quetion, 'question_options': question_options,
                     'answer_id': None, 'answer_content': None, 'answer_addtional_input': None
                     })
            else:
                display_answers.append(
                    {'step_question': step_quetion, 'question_options': question_options, 
                     'answer_id': answer.answer_id, 'answer_content': answer.content, 'answer_addtional_input': answer.addtional_input
                     })
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)   
    serializer = RegisterUserStepDisplaySerializer({'user_step': user_step, 'answers': display_answers})
    return Response(serializer.data)
@api_view(['POST'])
def update_user_step(request):
    register_id_req = request.POST.get('registerid')
    step_id_req = request.POST.get('stepid') 
    #user_step_id_req = request.POST.get('userstepid') 
    is_submit_req = request.POST.get('issubmit') 
    answers_json = request.POST.get('answers') 
    #print('answers_json')
    #print(answers_json)
    answers_list = json.loads(answers_json)
    try:
        update_user_step_with_questions(register_id_req, step_id_req, answers_list, is_submit_req)
    except:
        ##--- TODO: log the real issue and return a user friendly msg. ---##
        return Response(data={'success': False, 'errmsg': "Failed to submit"}, status=status.HTTP_417_EXPECTATION_FAILED)    
    return Response(data={'success': True, 'errmsg': ""}, status=status.HTTP_200_OK)
