<?php

namespace App\Repository;

use App\Entity\Evenement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Evenement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Evenement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Evenement[]    findAll()
 * @method Evenement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EvenementRepository extends ServiceEntityRepository
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * EvenementRepository constructor.
     * @param ManagerRegistry $registry
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Evenement::class);
        $this->entityManager = $entityManager;
    }

    /**
     * @param $value
     * @return bool
     *
     * Description :
     * Récupère tous les événements par leurs titre et mets à jour ceux qui n'éxiste pas
     */
    public function findEvenementByTitle($value){

        $doctrine = $this->entityManager;

        /** Récupère tous les événements par leurs titre */
        $evenementUpdate = $doctrine
            ->getRepository(Evenement::class)
            ->findOneBy(['title' => $value]);

        /** Mets à jour les événements qui n'existe pas */
        if (is_null($evenementUpdate)) {
            return False;
        }
        else{
            return True;
        }
    }
}
