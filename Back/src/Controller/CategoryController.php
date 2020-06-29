<?php

namespace App\Controller;


use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CategoryController
 * @package App\Controller
 */
class CategoryController extends AbstractController
{

    /**
     * @Route("/categories/{indice}", name="categories", methods={"GET"})
     * @param CategoryRepository $categoryRepository
     * @return Response
     *
     * Description :
     * Récupère toutes les categories de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findCategory(CategoryRepository $categoryRepository,$indice)
    {

        $categories = $categoryRepository->findBy(array(), array('id' => 'DESC'),$indice);
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($categories, 'json',['groups' => ['category']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/category/{id}", name="category", methods={"GET"})
     * @param Category $category
     * @return Response
     *
     * Description :
     * Recupere une categorie par son id et retourne un objet json
     */
    public function findOneCategory(Category $category)
    {

        $data = $this->get('serializer')->serialize($category, 'json',['groups' => ['category']]);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
