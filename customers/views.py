from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render, redirect
from django.contrib import messages
from stores.models import Stock
from .models import Orders
from stores.models import RetailStore


def index_view(request):
    """ This view displays the default template. Any user can use this template to navigate throughout the website. """
    stores = RetailStore.objects.all().order_by('name')
    
    p = Paginator(stores, 2) 
    page_number = request.GET.get('page')

    try:
        page_obj = p.get_page(page_number)

    except PageNotAnInteger:
        # if page_number is not an integer then assign the first page
        page_obj = p.page(1)
    except EmptyPage:
        # if page is empty then return last page
        page_obj = p.page(p.num_pages)

    context = {'retail_stores': stores, 'page': page_obj}
    return render(request, 'customers/index.html', context)


def store_details_view(request, retail_store):
    """ This view displays info of the provided retail store """
    store = RetailStore.objects.get(id=retail_store)

    context = {'store': store}
    return render(request, 'customers/store-info.html', context)

def place_order_view(request):

    context = {}
    return render(request, 'customers/', context)